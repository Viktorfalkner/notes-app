import { useTransition } from "react";
import { Button } from "./ui/button";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogDescription,
  DialogTitle,
} from "./ui/dialog";
import { Textarea } from "./ui/textarea";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import toast from "react-hot-toast";
import { addNewNoteAction } from "@/actions/notes";

type Props = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function NewNoteDialog({ setOpen }: Props) {
  const [isPending, startTransition] = useTransition();

  const handleAddNewNote = async (formData: FormData) => {
    startTransition(async () => {
      const { errorMessage } = await addNewNoteAction(formData);
      if (!errorMessage) {
        setOpen(false);
        toast.success("Successfully Added a new Note");
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

      <form action={handleAddNewNote}>
        <Textarea
          id="text"
          name="text"
          disabled={isPending}
          className="mb-6 mt-2 min-h-[300px]"
        />

        <DialogFooter>
          <Button
            type="submit"
            disabled={isPending}
            variant={"secondary"}
            className="w-40"
          >
            {isPending ? "Adding Note..." : "Add Note"}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}

export default NewNoteDialog;
