import Page from '../layout/Page';

function Changelog() {
  return (
    <Page>
      <section>
        <h2>Changelog</h2>

        <article>
          <h3>v2.3.0 - 14/11/25</h3>
          <ul>
            <li>Add two new maps: corridor and box</li>
          </ul>
        </article>
        <hr />
        <article>
          <h3>v2.2.0 - 13/10/25</h3>
          <ul>
            <li>Add difficulty screen</li>
            <li>Slow the game a little bit on mobile</li>
            <li>Prepare the codebase to the future maps feature</li>
            <li>Add changelog screen</li>
            <li>Remove text selection issue on the control buttons</li>
          </ul>
        </article>
        <hr />
        <article>
          <h3>v2.1.0 - 12/10/25</h3>
          <ul>
            <li>Add responsive game entities size</li>
            <li>Split the states file into multiple slices</li>
            <li>Create classes for the game entities (snake, snake-part and food until now)</li>
          </ul>
        </article>
        <hr />
        <article>
          <h3>v2.0.0 - 09/10/25</h3>
          <ul>
            <li>New version released!</li>
            <li>New and better layout</li>
            <li>Now it works on mobile</li>
            <li>Add three seconds timer before te game start</li>
            <li>Made with React, Konva and Zustand</li>
          </ul>
        </article>
      </section>
    </Page>
  );
}

export default Changelog;
