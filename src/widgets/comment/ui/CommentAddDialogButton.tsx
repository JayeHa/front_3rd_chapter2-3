import { Plus } from "lucide-react"
import { useState } from "react"
import { NewComment } from "../../../entities/comment/model/types"
import { Post } from "../../../entities/post/model/types"
import { CommentAddButton } from "../../../features/comment"
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Textarea,
} from "../../../shared/ui"

type CommentAddDialogProps = {
  newComment: NewComment
  setNewComment: React.Dispatch<React.SetStateAction<NewComment>>
  postId: Post["id"]
}

export const CommentAddDialogButton = ({
  newComment,
  setNewComment,

  postId,
}: CommentAddDialogProps) => {
  const [showAddCommentDialog, setShowAddCommentDialog] = useState(false)

  const handleOpenDialog = () => {
    setNewComment((prev) => ({ ...prev, postId }))
    setShowAddCommentDialog(true)
  }

  const handleCloseDialog = () => {
    setShowAddCommentDialog(false)
    setNewComment({ body: "", postId: null, userId: 1 })
  }

  return (
    <>
      <Button size="sm" onClick={handleOpenDialog}>
        <Plus className="w-3 h-3 mr-1" />
        댓글 추가
      </Button>

      {/* 댓글 추가 대화상자 */}
      <Dialog
        open={showAddCommentDialog}
        onOpenChange={setShowAddCommentDialog}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>새 댓글 추가</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              placeholder="댓글 내용"
              value={newComment.body}
              onChange={(e) =>
                setNewComment({ ...newComment, body: e.target.value })
              }
            />
            <CommentAddButton
              newComment={newComment}
              onAddSuccess={handleCloseDialog}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
