import Header from './Header';
import Footer from './Footer';

function Page(props) {
  return (
    <main>
      <Header />
      <div className="page-content">
        <div className="page-content-inner">
          {props.children}
        </div>
      </div>
      <Footer />
    </main>
  );
}

export default Page;
