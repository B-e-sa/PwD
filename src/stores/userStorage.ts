import { writable } from "svelte/store";
import type { UserData } from "../types/UserData";
import { defaultUserData } from "../utils/userDataActions";

const userStorage = writable<{ profile: string; data: UserData }>({
  profile: "",
  data: defaultUserData,
});
userStorage.subscribe((value) => {
  console.log(value)
});

export default userStorage;
