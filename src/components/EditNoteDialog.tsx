"use client";

import { editeNoteAction } from "@/actions/notes";
import { Note } from "@/db/schemas/notes";
import { Button } from "./ui/button";
import { Dispatch, SetStateAction, useTransition } from "react";
import toast from "react-hot-toast";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./ui/dialog";
import { Textarea } from "./ui/textarea";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

type Props = {
  setOpen: Dispatch<SetStateAction<boolean>>;
  note: Note;
};

function EditNoteDialog({ setOpen, note }: Props) {
  const [isPending, startTransition] = useTransition();

  const handleEditNote = async (formData: FormData) => {
    startTransition(async () => {
      const { errorMessage } = await editeNoteAction(formData);
      if (!errorMessage) {
        setOpen(false);
        toast.success("Successfully edited note");
      } else {
        toast.error(errorMessage);
      }
    });
  };

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>Add New Note</DialogHeader>

      {/* FOR ACCESSIBILITY - HIDDEN VISUALLY */}
      <VisuallyHidden.Root>
        <DialogTitle>Add New Note</DialogTitle>
        <DialogDescription>Fixed the warning</DialogDescription>
      </VisuallyHidden.Root>

      <form action={handleEditNote}>
        <Textarea
          id="text"
          name="text"
          disabled={isPending}
          defaultValue={note.text}
          className="mb-6 mt-2 min-h-[300px]"
        />

        <input type="text" hidden name="noteId" value={note.id} />

        <DialogFooter>
          <Button
            type="submit"
            disabled={isPending}
            variant={"secondary"}
            className="w-40"
          >
            {isPending ? "Updating a Note..." : "Update Note"}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}

export default EditNoteDialog;
