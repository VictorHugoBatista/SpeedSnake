import Page from '../layout/Page';

function About() {
  return (
    <Page>
      <section>
        <h2>About</h2>
        <p>In 2015, I was studying HTML, jQuery and CSS, getting myself ready for starting to work as web developer. At the moment, I decided to rewrite the old snake game that I made in Java 6 with desktop forms on my Computer Scicence times.</p>
        <p>The legacy game wasn't responsive, but got me to learn so much at the time, like events and DOM manipulation.</p>
        <p>After working with React Native for some years, I felt the need to get updated with the current ReactJS state and discovered so many new things! That was when I first thought in remaking that game, whitch helped me getting my first Developer full time job (in the craziest way possible :v)</p>
        <p>This game counts with Konva/React Konva for drawing the canvas (note that I didn't use advanced tech as canvas back then, it was all made with HTML elements) and Zustand for centralize the states and the game rules.</p>
        <p>I made a layout based in the 2000, same time that I played a game like this in a Nokia 2280. This game is full of nostalgia and oposes with the idea of simples and flat layouts (c'mon, we have so coll CSS features for year and all we do is flat, square and boring websites??).</p>
        <p>Hope you have some fun with this game, that I pretend to improve with the time!</p>
      </section>
    </Page>
  );
}

export default About;
