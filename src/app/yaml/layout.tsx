import { metadata as yamlMetadata } from "./metadata";
import type { Metadata } from "next";

export const metadata: Metadata = yamlMetadata;

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
