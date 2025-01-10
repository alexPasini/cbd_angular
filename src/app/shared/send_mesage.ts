export class SendWhats{
  formatMasage(){
    let initiaMesage = 'Ola, selecionei os seguintes produtos na loja.\n'
    let itemsMesage=''
    let totalPrice=0


    let infoMesage = `\n *Total:* R$ ${totalPrice}\n\n`
    // let finalMesage = initiaMesage +itemsMesage+infoMesage
    let finalMesage = ""
    return finalMesage
  }
  sendMensage() {
    // Codifica a mensagem para a URL
    const encodedMessage = encodeURIComponent(this.formatMasage());
    const href = `https://wa.me/+5555999177627?text=${encodedMessage}`;
    console.log(href)

    // Abre o WhatsApp em uma nova aba
    window.open(href, "_blank");
  }
}

// 5547992122928
