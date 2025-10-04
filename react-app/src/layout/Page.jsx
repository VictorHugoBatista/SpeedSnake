import Header from './Header';
import Footer from './Footer';

function Page(props) {
  return (
    <main>
      <Header />
      {props.children}
      <Footer />
    </main>
  );
}

export default Page;
