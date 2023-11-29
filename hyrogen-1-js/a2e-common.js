function getLoaderStyles() {
  return ` #loader {
          position: fixed;
          left: 0;
          top: 0;
          right: 0;
          bottom: 0;
          z-index: 99999;
          background: #FFF;
          opacity: 0.5;
          display: flex;
          align-items: center;
          justify-content: center; 
        }
      
          @-webkit-keyframes spinner-border {
            to {
              -webkit-transform: rotate(360deg);
              transform: rotate(360deg); } 
            }
          
          @keyframes spinner-border {
            to {
              -webkit-transform: rotate(360deg);
              transform: rotate(360deg); } 
            }
          .spinner-border:before{
           content: '';
          }    
          .spinner-border:after{
           content: '';
          }   
          .spinner-border  {
            display: inline-block !important;
            width: 2rem;
            height: 2rem;
            vertical-align: text-bottom;
            border: 0.25em solid currentColor;
            border-right-color: transparent;
            border-radius: 50%;
            -webkit-animation: spinner-border 1s linear infinite;
            animation: spinner-border 1s linear infinite; 
            }`;
}
function addLoaderStyles() {
  const loaderStyles = document.createElement('style');
  loaderStyles.id = 'a2e-loader-style';
  loaderStyles.innerHTML = getLoaderStyles();
  document.head.appendChild(loaderStyles);

  const divLoader = document.createElement('div');
  divLoader.id = 'loader';
  divLoader.style = 'display:none';
  const divSpin = document.createElement('div');
  divSpin.className = 'spinner-border';
  divLoader.appendChild(divSpin);
  const body = document.querySelector('body');
  body.appendChild(divLoader);
}
window.onload = function () {
  addLoaderStyles();
};

function startPageLoader() {
  const divLoader = document.getElementById('loader');
  divLoader.style = 'display:flex';
}
function stopPageLoader() {
  const divLoader = document.getElementById('loader');
  divLoader.style = 'display:none';
}

function sleep(lf_ms) {
  return new Promise((resolve) => setTimeout(resolve, lf_ms));
}
