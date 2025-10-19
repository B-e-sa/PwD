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

function replaceUserData<K extends keyof UserData>(key: K, value: UserData[K]) {
  userStorage.update((prev) => ({
    ...prev,
    data: {
      ...prev.data,
      [key]: value,
    },
  }));
}

function updateUserData<K extends keyof UserData>(
  key: K,
  value: UserData[K][number]
) {
  userStorage.update((prev) => ({
    ...prev,
    data: {
      ...prev.data,
      [key]: [...prev.data[key], value],
    },
  }));
}

export { replaceUserData, updateUserData };
export default userStorage;
