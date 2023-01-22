import Document, { Html, DocumentContext, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700;&display=fallback"/>
          <link rel="stylesheet" href="/static/fontawesome-free/all.min.css"/>
          <link rel="stylesheet" href="/static/tempusdominus-bootstrap-4/tempusdominus-bootstrap-4.min.css"/>
          <link rel="stylesheet" href="/static/icheck-bootstrap/icheck-bootstrap.min.css"/>
          <link rel="stylesheet" href="/static/jqvmap/jqvmap.min.css"/>
          <link rel="stylesheet" href="/static/overlayScrollbars/OverlayScrollbars.min.css"/>
          <link rel="stylesheet" href="/static/daterangepicker/daterangepicker.css"/>
          <link rel="stylesheet" href="/static/datatables/dataTables.bootstrap4.min.css"/>
          <link rel="stylesheet" href="/static/bootstrap/responsive.bootstrap4.min.css"/>
          <link rel="stylesheet" href="/static/datatables-buttons/buttons.bootstrap4.min.css"/>
          <link rel="stylesheet" href="/static/summernote/summernote-bs4.min.css"/>
          <link rel="stylesheet" href="/static/css/adminlte.min.css"/>
        </Head>
        <body className="hold-transition sidebar-mini layout-fixed">
          <div className="wrapper">
            <div className="preloader" style={{height: "100%", backgroundColor:"#ffd9e5"}}>
              <img src="/cert.png" style={{marginTop: "15%"}} alt="cert" height={200} width={200} className="rounded mx-auto" />
            </div>
            <Main />
          </div>
          <NextScript />

          <script src="/static/jquery/jquery.min.js"></script>
          <script src="/static/jquery/jquery-ui.min.js"></script>
          <script src="/static/bootstrap/bootstrap.bundle.min.js"></script>
          <script src="/static/datatables/jquery.dataTables.min.js"></script>
          <script src="/static/datatables/dataTables.bootstrap4.min.js"></script>
          <script src="/static/datatables/dataTables.responsive.min.js"></script>
          <script src="/static/bootstrap/responsive.bootstrap4.min.js"></script>
          <script src="/static/datatables/dataTables.buttons.min.js"></script>
          <script src="/static/datatables-buttons/buttons.bootstrap4.min.js"></script>
          <script src="/static/sparklines/sparkline.js"></script>
          <script src="/static/chart/Chart.min.js"></script>
          <script src="/static/jqvmap/jquery.vmap.min.js"></script>
          <script src="/static/jqvmap/maps/jquery.vmap.usa.js"></script>
          <script src="/static/jquery-knob/jquery.knob.min.js"></script>
          <script src="/static/moment/moment.min.js"></script>
          <script src="/static/daterangepicker/daterangepicker.js"></script>
          <script src="/static/tempusdominus-bootstrap-4/tempusdominus-bootstrap-4.min.js"></script>
          <script src="/static/summernote/summernote-bs4.min.js"></script>
          <script src="/static/overlayScrollbars/jquery.overlayScrollbars.min.js"></script>
          <script src="/static/js/adminlte.js"></script>
          <script src="/static/datatables-buttons/buttons.colVis.min.js"></script>
          <script src="/static/datatables-buttons/buttons.html5.min.js"></script>
          <script src="/static/datatables-buttons/buttons.print.min.js"></script>
          <script src="/static/datatables-buttons/dataTables.buttons.min.js"></script>
          <script src="/static/jszip/jszip.min.js"></script>
          <script src="/static/pdfmake/pdfmake.min.js"></script>
          <script src="/static/pdfmake/vfs_fonts.js"></script>
          {/* <script src="/static/js/tes.js"></script> */}



        </body>
      </Html>
    )
  }
}

export default MyDocument
