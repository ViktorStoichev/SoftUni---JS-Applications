import { characterService } from '../data/character.js';
import { likeService } from '../data/likes.js';
import { html, render, page } from '../lib.js'
import { userUtility } from '../util.js';

const detailsTemplate = (data, likes, hasUser, hasLiked, isOwner, onDelete, onLike) => html`
  <!-- Details page -->
  <section id="details">
    <div id="details-wrapper">
      <img id="details-img" src=${data.imageUrl} alt="example1" />
      <div>
      <p id="details-category">${data.category}</p>
      <div id="info-wrapper">
        <div id="details-description">
          <p id="description">${data.description}</p>
             <p id ="more-info">${data.moreInfo}</p>
        </div>
      </div>
        <h3>Is This Useful:<span id="likes">${likes}</span></h3>

         <!--Edit and Delete are only for creator-->
        ${hasUser ? html`
        <div id="action-buttons">
            ${isOwner ? html`
            <a href="/edit/${data._id}" id="edit-btn">Edit</a>
            <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>` : null}

            ${hasLiked ? null : html`
                <a @click=${onLike} href="javascript:void(0)" id="like-btn">Like</a>`}

        </div>` : null}
      </div>
  </div>
</section>`;

export async function detailsView(ctx) {
    const id = ctx.params.id;

    const [data, likesInfo] = await Promise.all([
        characterService.getCharacterById(id),
        likeService.getLikesByCharacterId(id)
    ]);

    const userData = userUtility.getUserData();

    const isOwner = userData?._id === data._ownerId;
    const hasLiked = likesInfo.hasLiked || isOwner;

    render(detailsTemplate(data, likesInfo.likes, Boolean(userData), hasLiked, isOwner, onDelete, onLike))

    async function onDelete() {
        const choice = confirm('Are you sure?');

        if (!choice) {
            return;
        }

        await characterService.deleteCharacter(id);

        page.redirect('/dashboard');
    }

    async function onLike() {
        await likeService.likeCharacter(id);

        page.redirect('/catalog/' + id);
    }
}