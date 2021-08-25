import Layout from '../component/layout'
import Quagga from 'quagga'




export default function Home() {

  const imageRecognition = (e) => {
    e.preventDefault()
    const fileURL = URL.createObjectURL(e.target.files[0])
    const resultDom = document.getElementById('result')

    Quagga.decodeSingle({
      decoder: {
        readers: ["ean_reader"] // List of active readers
      },
      locate: true, // try to locate the barcode in the image
      src: fileURL
      // src: '/test/fixtures/code_128/image-001.jpg' // or 'data:image/jpg;base64,' + data
      }, function(result){
        try {
          if(result.codeResult) {
              resultDom.innerText = result.codeResult.code
              console.log("result", result.codeResult.code);
          } else {
              resultDom.innerText = result.codeResult
              console.log("not detected");
          }
        } catch(e){
          resultDom.innerText = e
        }
      });
    
  }


  return (
    <Layout>
      <div className="container">
        <div className="my-3">
          <label htmlFor="formFile" className="form-label">ISBNコード読み取り</label>
          <input onChange={imageRecognition} className="form-control" type="file" id="formFile" accept="image/*" capture="environment"/>
        </div>
        <div id="result"></div>
      </div>   
    </Layout>
    )
}
