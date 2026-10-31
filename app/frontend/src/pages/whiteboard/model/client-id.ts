import { randomUUID } from "@/shared/lib";

// Identifies this tab on the board socket; a reload joins as a new member.
export const CLIENT_ID = randomUUID();
