"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useTransition } from "react";
import { deleteOrder, deleteSheinOrder } from "../../_actions/orders";
import { useRouter } from "next/navigation";

export function DeleteDropDownItem({ id, type }: { id: string; type: string }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <DropdownMenuItem
      //   variant="destructive"
      disabled={isPending}
      onClick={() =>
        startTransition(async () => {
          {
            type === "normal"
              ? await deleteOrder(id)
              : await deleteSheinOrder(id);
          }
          router.refresh();
        })
      }
    >
      Delete
    </DropdownMenuItem>
  );
}
