

export const Block = props => {

    if (!props.state.cart) {
        props.state.cart = []
      }

    let size = props.state.cart.includes(props.book.title)?20:25

    return <c-c style={{
        width: 150, flex: 1, minWidth: 150,
        position: "relative", backgroundColor:"greenyellow",
        borderRadius:5, margin:"10px",boxShadow:"0px 0px 9px 2px rgba(0,0,0,0.43)"
    }}>

        <img
            className={global.styles.hover}
            src={props.book.imageLink}
            style={{
                width: "100%", 
                height: 200,
                objectFit: "fill",
                minWidth: 150, 
                borderTopLeftRadius:5,
                borderTopRightRadius:5,
            }}
            onClick={() => {
                props.state.form = "bookspecs"
                props.state.book = props.book
                props.refresh()

            }} />

        <f-cc style={{ padding: "5px", width: "100%", height:40, direction:"ltr"}}>
            <f-12>{props.book.title}</f-12>
        </f-cc>
        <hr style = {{width:75, opacity: 0.2, padding:"0 2px"}}></hr>

        <f-csb style={{ width: "100%", padding: "5px 0", backgroundColor:"#EE9631" }}>

            <img src={props.state.cart.includes(props.book.title)?
            "https://cdn.ituring.ir /qepal/ok.svg":
            "https://cdn.ituring.ir /qepal/cart.svg"}

            style={{height:35, width:35, objectFit:"contain",
                margin:"0 10px"
            }}/>


            <c-x style = {{direction:"ltr", margin:"0 10px"}}>
                <f-15> <del>59 $</del></f-15>
                <f-15>40 $</f-15>

            </c-x>
        </f-csb>


    </c-c>
}

