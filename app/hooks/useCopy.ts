"use client";
import Swal from "sweetalert2";
export default async function UseCopy(text:string) {
  try {
    await navigator.clipboard.writeText(text);
    Swal.fire('Link copied to clipboard');
  } catch (err) {
    Swal.fire(`Failed to copy Link: ${err}`);
  }
}