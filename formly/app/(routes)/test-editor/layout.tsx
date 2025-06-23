import React from "react";

export default async function EditorPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): Promise<React.ReactNode> {
  return <>{children}</>;
}

