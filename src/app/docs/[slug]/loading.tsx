import { Icon } from "@iconify-icon/react";

export default function Loading() {
  return (
    <div className="">
      <p className="inline-flex items-center gap-2">
        <Icon
          icon="ph:circle-notch-bold"
          className="h-6 w-6 animate-spin text-ycp-orange"
        />
        Loading...
      </p>
    </div>
  );
}
