import React from "react";

export function PushButton({ children, onClick, className = "", href, ...props }) {
  if (href) {
    return (
      <a
        href={href}
        className={`push-btn ${className}`}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      className={`push-btn ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}

export default PushButton;
