import { BaseDirectory } from "@tauri-apps/api/path";
import { exists, mkdir, readFile, writeFile } from "@tauri-apps/plugin-fs";
import type { UserData } from "../types/UserData";
import { join } from "@tauri-apps/api/path";

const colors = [
  "#33ff57",
  "#ff5733",
  "#3357ff",
  "#f333ff",
  "#33ffdb",
  "#7c33ff",
];
const tags = [
  {
    uuid: crypto.randomUUID(),
    name: "Linux",
    color: colors[1],
  },
  {
    uuid: crypto.randomUUID(),
    name: "Navegação",
    color: colors[0],
  },
];
const date = new Date();

export const defaultUserData: UserData = {
  tags,
  colors,
  commands: [
    {
      uuid: crypto.randomUUID(),
      command: "pwd",
      description:
        "Sigla de Print Working Directory. O comando retorna a estrutura do diretório atual como texto no terminal.\nEquivalente ao comando dir em distribuições windows. Exemplo:\n$ cd /home/example\n$ pwd\n/home/example\nA flag -P retorna o diretório sem nenhuma informação simbólica, o contrário da flag -L.",
      flags: ["-P", "-L"],
      tags: [tags[0].uuid, tags[1].uuid],
      updatedAt: date,
      createdAt: date,
    },
  ],
};

export const baseDir = { baseDir: BaseDirectory.Config };

async function getProfilePath(profile: string): Promise<string> {
  return await join("PwD", "users", profile);
}

export async function profileExists(profile: string): Promise<boolean> {
  const profilePath = await getProfilePath(profile);
  return await exists(profilePath, baseDir);
}

export async function writeUserData(
  profile: string,
  data: UserData
): Promise<void> {
  try {
    await ensureDataFiles(profile);
    const filePath = await join("PwD", "users", profile, "data.bin");
    const encoder = new TextEncoder();

    await writeFile(
      filePath,
      encoder.encode(JSON.stringify(data ?? defaultUserData)),
      baseDir
    );

    console.log(await readUserDataFile(profile));
  } catch (err) {
    // TODO
  }
}

export async function ensureDataFiles(profile: string): Promise<void> {
  const userBase = await join("PwD", "users", profile);
  const appDir = await join("PwD");
  const usersDir = await join("PwD", "users");

  if (!(await exists(appDir, baseDir))) await mkdir(appDir, baseDir);
  if (!(await exists(usersDir, baseDir))) await mkdir(usersDir, baseDir);
  if (!(await exists(userBase, baseDir))) {
    await mkdir(userBase, baseDir);
    await writeUserData(profile, defaultUserData);
  }
}

export async function readUserDataFile(profile: string): Promise<UserData> {
  try {
    await ensureDataFiles(profile);
    const filePath = await join("PwD", "users", profile, "data.bin");

    if (!(await exists(filePath, baseDir)))
      await writeUserData(profile, defaultUserData);

    const binFile = await readFile(filePath, baseDir);

    const decoder = new TextDecoder();
    return JSON.parse(decoder.decode(binFile));
  } catch (err) {
    // TODO: mensagem de erro
    return defaultUserData;
  }
}
