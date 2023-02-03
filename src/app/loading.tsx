import { Icon } from "@iconify-icon/react";

export default function Loading() {
  return (
    <div className="">
      <p className="inline-flex gap-2 items-center">
        <Icon icon="ph:circle-notch-bold" className="w-6 h-6 text-ycp-orange animate-spin" />
        Loading...
      </p>
    </div>
  );
}
