<script lang="ts">
  import Button from "$lib/components/Button.svelte";
  import Input from "$lib/components/Input.svelte";
  import { onMount } from "svelte";
  import "../index.css";
  import {
    profileExists,
    readUserDataFile,
    ensureDataFiles,
  } from "../utils/userDataActions";
  import { navigate } from "../utils/navigate";
  import WindowBar from "$lib/components/WindowBar.svelte";
  import userStorage from "../stores/userStorage";

  let user = $state("");

  let action = $state<"login" | "register">("login");

  async function setUserData(profile: string) {
    const { commands, tags, colors } = await readUserDataFile(profile);

    $userStorage.profile = profile;
    $userStorage.data.commands = commands;
    $userStorage.data.tags = tags;
    $userStorage.data.colors = colors;

    await new Promise(r => setTimeout(r, 2000));

  }

  async function handleRegister() {
    const tUser = user.trim();
    $userStorage.profile = tUser;
    await ensureDataFiles(tUser);
    navigate(window, "/home");
  }

  async function handleLogin() {
    if (!user) return;

    const tUser = user.trim();
    if (tUser) {
      if (await profileExists(tUser)) {
        await setUserData(tUser);
        navigate(window, "/home");
      } else {
        action = "register";
      }
    }
  }

  function handleEnterKey(e: KeyboardEvent | UIEvent) {
    if ((e as KeyboardEvent).key === "Enter") {
      if (action === "login") {
        handleLogin();
      } else {
        handleRegister();
      }
    }
  }

  onMount(() => {
    window.addEventListener("keyup", (e) => {
      handleEnterKey(e);
    });

    return () => {
      window.removeEventListener("resize", (e) => handleEnterKey(e));
    };
  });
</script>

<WindowBar />
<div id="cont">
  <div id="main">
    <h1 class="fl">{action === "login" ? "Bem Vindo!" : "Novo Perfil"}</h1>
    <p style="text-align: center;">
      {action === "login"
        ? "Entre com o seu nome de perfil"
        : "Este perfil não existe ou foi digitado de forma incorreta, deseja voltar ao login ou criar um novo?"}
      {#if action === "login"}<br /> (caso não tenha, digite um novo){/if}
    </p>
    {#if action === "login"}
      <Input
        wrapperProps={{ style: "margin-bottom: 15px;" }}
        placeholder="Nome de perfil"
        value={user}
        onkeyup={(e) => (user = e.currentTarget.value)}
      />
      <Button disabled={user.trim().length === 0} onclick={handleLogin}>
        Entrar
      </Button>
    {:else}
      <div id="buttons">
        <Button onclick={() => (action = "login")} variant="transparent">
          Voltar
        </Button>
        <Button onclick={handleRegister}>Criar Novo</Button>
      </div>
    {/if}
  </div>
</div>

<style>
  #cont {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  #main {
    width: 350px;
    border-radius: var(--border-radius);

    & > p {
      color: var(--font-color);
      margin-bottom: 25px;
    }

    :global(button) {
      text-align: center;
      width: 100%;
      padding-block: 10px;
    }
  }

  h1 {
    text-align: center;
    color: var(--text-contrast);
    margin-bottom: 5px;
  }

  #buttons {
    margin-top: 15px;
    display: flex;
    align-items: center;
    justify-content: center;

    :global(button) {
      &:nth-child(1) {
        margin-right: 10px;
      }

      padding-block: 10px;
      padding-inline: 20px;
    }
  }
</style>
