"use client";

import * as React from "react";

type Props = {
  username: string;
  avatarUrl?: string;
  onClick?: () => void;
  className?: string;
};

export function OvalUserProfile({ username, avatarUrl, onClick, className }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 hover:bg-muted transition-colors " +
        (className ?? "")
      }
    >
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt={username}
          className="h-6 w-6 rounded-full object-cover"
        />
      ) : (
        <div className="h-6 w-6 rounded-full bg-muted text-xs flex items-center justify-center">
          {username?.charAt(0)?.toUpperCase() ?? "?"}
        </div>
      )}
      <span className="text-sm">{username}</span>
    </button>
  );
}

export default OvalUserProfile;

