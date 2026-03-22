import type { Metadata } from "next";
import JWTClient from "./jwt-client";
import { metadata as jwtMetadata } from "./metadata";

export const metadata: Metadata = jwtMetadata;

export default function JWTPage() {
  return <JWTClient />;
}
