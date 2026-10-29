export type ExpertChannel = "video" | "phone" | "store";
export type ExpertTimeWindow = "today" | "tomorrow" | "weekend" | "flexible";

export const EXPERT_CHANNELS: {
  id: ExpertChannel;
  title: string;
  copy: string;
}[] = [
  {
    id: "video",
    title: "Video call",
    copy: "A private face-to-face session with a Louve stylist.",
  },
  {
    id: "phone",
    title: "Phone",
    copy: "Speak at your pace — guidance without the screen.",
  },
  {
    id: "store",
    title: "In-store",
    copy: "Book an in-store jewellery appointment at a Louve boutique.",
  },
];

export const EXPERT_TIME_WINDOWS: { id: ExpertTimeWindow; label: string }[] = [
  { id: "today", label: "Today evening" },
  { id: "tomorrow", label: "Tomorrow" },
  { id: "weekend", label: "This weekend" },
  { id: "flexible", label: "Flexible" },
];

export const EXPERT_CHANNEL_LABEL: Record<ExpertChannel, string> = {
  video: "Video call",
  phone: "Phone",
  store: "In-store appointment",
};
