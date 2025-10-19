<script lang="ts">
  import { onMount } from "svelte";
  import Button from "./Button.svelte";

  const {
    onClose,
    onProceed,
  }: {
    onClose: (...args: any) => any;
    onProceed: (...args: any) => any;
  } = $props();
</script>

<div id="cont">
  <h2 class="fl">Novo Perfil</h2>
  <p>
    Este perfil não existe ou foi digitado de forma incorreta, deseja voltar ao
    login ou criar um novo?
  </p>
  <div id="buttons">
    <Button onclick={onClose} variant="transparent">Voltar</Button>
    <Button onclick={onProceed}>Criar Novo</Button>
  </div>
</div>

<style>
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

  h2 {
    color: var(--text-contrast);
    margin-bottom: 10px;
  }

  #cont {
    text-align: center;
    border-radius: var(--border-radius);
    & > p {
      color: var(--font-color);
      margin-bottom: 35px;
    }
  }
</style>
