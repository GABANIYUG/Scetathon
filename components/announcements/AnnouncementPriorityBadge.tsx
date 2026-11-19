import React from "react";
import { AnnouncementPriority } from "@/lib/types/database";
import { ANNOUNCEMENT_PRIORITIES } from "@/config/operations";
import { Badge } from "@/components/ui/Badge";

interface AnnouncementPriorityBadgeProps {
  priority?: AnnouncementPriority;
  size?: "sm" | "md";
}

export const AnnouncementPriorityBadge: React.FC<AnnouncementPriorityBadgeProps> = ({
  priority = "Normal",
  size = "sm",
}) => {
  const config = ANNOUNCEMENT_PRIORITIES[priority] || ANNOUNCEMENT_PRIORITIES.Normal;

  return (
    <Badge
      variant={config.badgeVariant}
      size={size}
      dot={priority === "Important" || priority === "Urgent"}
    >
      {config.label.toUpperCase()}
    </Badge>
  );
};

