import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

const BOUNDS = {
  minX: -5.4,
  maxX: 5.4,
  minZ: -8.2,
  maxZ: 8.2,
};

export function FreeWalkControls({ enabled }: { enabled: boolean }) {
  const { camera, gl } = useThree();
  const pressed = useRef<Record<string, boolean>>({});
  const dragging = useRef(false);
  const last = useRef({ x: 0, y: 0 });
  const euler = useRef(new THREE.Euler(0, 0, 0, "YXZ"));
  const forward = useMemo(() => new THREE.Vector3(), []);
  const right = useMemo(() => new THREE.Vector3(), []);
  const up = useMemo(() => new THREE.Vector3(0, 1, 0), []);

  useEffect(() => {
    euler.current.setFromQuaternion(camera.quaternion);
  }, [camera]);

  useEffect(() => {
    if (!enabled) {
      dragging.current = false;
      gl.domElement.style.cursor = "default";
      return;
    }

    const el = gl.domElement;
    el.style.cursor = "grab";

    const onDown = (e: KeyboardEvent) => {
      pressed.current[e.code] = true;
    };
    const onUp = (e: KeyboardEvent) => {
      pressed.current[e.code] = false;
    };

    const onPointerDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      dragging.current = true;
      last.current = { x: e.clientX, y: e.clientY };
      el.style.cursor = "grabbing";
      el.setPointerCapture(e.pointerId);
    };
    const onPointerUp = (e: PointerEvent) => {
      dragging.current = false;
      el.style.cursor = "grab";
      if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!dragging.current) return;
      const dx = e.clientX - last.current.x;
      const dy = e.clientY - last.current.y;
      last.current = { x: e.clientX, y: e.clientY };
      euler.current.setFromQuaternion(camera.quaternion);
      euler.current.y -= dx * 0.0035;
      euler.current.x -= dy * 0.0035;
      euler.current.x = THREE.MathUtils.clamp(
        euler.current.x,
        -Math.PI / 2.4,
        Math.PI / 2.4,
      );
      camera.quaternion.setFromEuler(euler.current);
    };

    window.addEventListener("keydown", onDown);
    window.addEventListener("keyup", onUp);
    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointerup", onPointerUp);
    el.addEventListener("pointercancel", onPointerUp);
    el.addEventListener("pointermove", onPointerMove);
    return () => {
      window.removeEventListener("keydown", onDown);
      window.removeEventListener("keyup", onUp);
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointerup", onPointerUp);
      el.removeEventListener("pointercancel", onPointerUp);
      el.removeEventListener("pointermove", onPointerMove);
      el.style.cursor = "default";
    };
  }, [enabled, camera, gl]);

  useFrame((_, delta) => {
    if (!enabled) {
      camera.position.y = 1.65;
      return;
    }
    const speed = pressed.current.ShiftLeft ? 4.2 : 2.4;
    let x = 0;
    let z = 0;
    if (pressed.current.KeyW || pressed.current.ArrowUp) z -= 1;
    if (pressed.current.KeyS || pressed.current.ArrowDown) z += 1;
    if (pressed.current.KeyA || pressed.current.ArrowLeft) x -= 1;
    if (pressed.current.KeyD || pressed.current.ArrowRight) x += 1;
    if (!x && !z) {
      camera.position.y = THREE.MathUtils.damp(camera.position.y, 1.65, 6, delta);
      return;
    }

    camera.getWorldDirection(forward);
    forward.y = 0;
    forward.normalize();
    right.crossVectors(forward, up).normalize();

    const len = Math.hypot(x, z) || 1;
    camera.position.addScaledVector(right, (x / len) * speed * delta);
    camera.position.addScaledVector(forward, (-z / len) * speed * delta);
    camera.position.x = THREE.MathUtils.clamp(
      camera.position.x,
      BOUNDS.minX,
      BOUNDS.maxX,
    );
    camera.position.z = THREE.MathUtils.clamp(
      camera.position.z,
      BOUNDS.minZ,
      BOUNDS.maxZ,
    );
    camera.position.y = 1.65;
  });

  return null;
}
