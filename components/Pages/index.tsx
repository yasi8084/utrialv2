import Component, { PageEl } from '@/components/Libs/Component';
import Copy from '@/components/Libs/Copy';
import Router from 'next/router'
import Window from '@/components/Libs/Window';
import TextBox from '@/components/Libs/TextBox';
import Icon2Titles from '@/components/Libs/Icon2Titles';
import Icon3Titles from '@/components/Libs/Icon3Titles';
import css from './css.module.css';
import './css.module.css';
import { GlobalLayoutRouterContext } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import WindowFloat from '../Libs/WindowFloat';

export default p => Component(p, Page);
const Page: PageEl = (props, state: {
  form: string
  book: { title: string, author: string, country: string, imageLink: string, price: number, year: number, pages: number },

  cart: Array<string>
}, refresh, getProps) => {

  let styles = global.styles
  let name = "welcome"

  let total_price = 0


  if (!state.cart) {
    state.cart = []
  }

  for (let title of state.cart) {
    let book = props.books.find(b => b.title == title)
    if (book) {
      total_price += (book.price * 0.8)
    }
  }


  console.log("renders....")
  return (
    <div style={{ direction: "ltr", minHeight: "11vh", }}>
      <br-x />
      {state.form == "bookspecs" ? <WindowFloat title="Book Details" onclose={() => {
        delete state.form
        refresh()
      }}>
        hello
        {/*<pre>[JSON.stringify(state.book, null, 2)]</pre>*/}

        <f-cc>
          <f-15>book name:</f-15>
          <sp-2 />
          <f-15>{state.book.title}</f-15>
        </f-cc>

        <f-cc>
          <f-15> book year:</f-15>
          <sp-2 />
          <f-15>{state.book.year}</f-15>
        </f-cc>

        <f-cc>
          <f-15>book author:</f-15>
          <sp-2 />
          <f-15>{state.book.author}</f-15>
        </f-cc>

        <f-cc>
          <f-15>book price:</f-15>
          <sp-2 />
          <f-15>{state.book.price}</f-15>
        </f-cc>

        <f-cc>
          <f-15>book pages:</f-15>
          <sp-2 />
          <f-15>{state.book.pages}</f-15>
        </f-cc>

        <f-cc>
          <f-15>book country:</f-15>
          <sp-2 />
          <f-15>{state.book.country}</f-15>
        </f-cc>

        <g-b style={{
          backgroundColor:
            state.cart.includes(state.book.title) ? "#CE0C0C" :
              "#92CCA3"
        }} onClick={() => {
          if (state.cart.includes(state.book.title)) {
            state.cart = state.cart.filter(bookname => state.book.title != bookname)
            state.form = null
            refresh()
          }
          else {
            state.cart.push(state.book.title)
            state.form = null
            refresh()
          }

        }}>
          {state.cart.includes(state.book.title) ? <f-13>Remove from cart</f-13> : <f-13>Add to cart</f-13>}

        </g-b>

      </WindowFloat > : null
      }
      <Window title=" Cart" style={{ margin: 10, width: "calc(100% - 20px)" }}>
        <f-cse style={{ height: 60, width: "100px" }}>
          <f-14>total price: 100$</f-14>
          <f-14>total books: 14</f-14>
        </f-cse>
      </Window>
      <Window title={"welcome"}
        style={{ minHeight: 200, margin: 10, width: "calc(100% - 20px)" }}>
        {/* <pre style={{ direction: "ltr" }}>{JSON.stringify(props, null, 2)}</pre>*/}

        <w-cse style={{}}>
          {props.books.map(book => {
            return <img
              className={global.styles.hoverzoom_nofade}
              src={book.imgLink} style={{ width: 150, height: 200, objectFit: "fill", flex: 1, minWidth: 160 }}
              onClick={() => {
                state.form = "bookspecs"
                state.book = book
                book = { book }
                refresh()
              }} />
          })}
        </w-cse>
      </Window>
    </div >
  )
}


export async function getServerSideProps(context) {


  var session = await global.SSRVerify(context)
  var { uid, name, image, imageprop, lang, cchar,
    unit, workspace, servid, servsecret,
    usedquota, quota, quotaunit, status, regdate, expid,
    role, path, devmod, userip, } = session;

  let books = await global.db.collection("books").find({}).toArray();

  for (let book of books) {
    book.imageLink = "https://cdn.ituring.ir /research/ex/books/" + book.imageLink
  }

  console.log(books)
  return {
    props: {
      data: global.QSON.stringify({
        session,
        books,
        // nlangs,
      })
    },
  }
}