import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SharePopoverProps {
  onClose: () => void;
  onShare: (email: string) => void;
}

const SharePopover: React.FC<SharePopoverProps> = ({
  onClose,
  onShare,
}) => {
  const [email, setEmail] = useState("");

  const handleShare = () => {
    if (email) {
      onShare(email);
      setEmail(""); // Clear the input after sharing
    }
  };

  return (
    <div className="popover">
      <h3>Share Note</h3>
      <Input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <div className="flex justify-end space-x-2 mt-2">
        <Button onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleShare}>Share</Button>
      </div>
    </div>
  );
};

export default SharePopover;
