import { writable } from "svelte/store";
import type { UserData } from "../types/UserData";
import { defaultUserData, writeUserData } from "../utils/userDataActions";

const userStorage = writable<{ profile: string; data: UserData }>({
  profile: "",
  data: defaultUserData,
});

userStorage.subscribe(async (value) => {
  if (value.profile) await writeUserData(value.profile, value.data);
});

export default userStorage;
