import { AppShell } from "@/components/layout/app-shell";
import { SidebarNav } from "@/components/layout/sidebar-nav";
import { ChatPanel } from "@/components/chat/chat-panel";

export default function Home() {
  return (
    <AppShell sidebar={<SidebarNav />}>
      <div className="mx-auto max-w-3xl space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Neutral chat</h1>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            LangChain on the server — optional OpenAI via{" "}
            <code className="rounded bg-zinc-200 px-1 dark:bg-zinc-800">OPENAI_API_KEY</code>.
          </p>
        </div>
        <ChatPanel />
      </div>
    </AppShell>
  );
}
