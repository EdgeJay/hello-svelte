import { mount } from 'svelte';
import 'bulma/css/bulma.css';
import 'boxicons/css/boxicons.css';
import App from '@/App.svelte';

const app = mount(App, {
  target: document.getElementById('app')!,
});

export default app;
