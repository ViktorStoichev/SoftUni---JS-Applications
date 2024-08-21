import { characterService } from "../data/character.js";
import { html, render } from "../lib.js";
import { characterTemplate } from "./partials/character.js";

const dashboardTemplate = (characters) => html`
<!-- Dashboard page -->
  <h2>Characters</h2>
  <section id="characters">
    <!-- Display a div with information about every post (if any)-->
    ${characters.length ? characters.map(characterTemplate) : html`<h2>No added Heroes yet.</h2>`}
    
  </section>
   <!-- Display an h2 if there are no posts -->`

export async function dashboardView() {
    const characters = await characterService.getAllCharacters();

    render(dashboardTemplate(characters));
}