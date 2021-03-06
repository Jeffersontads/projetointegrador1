import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { TipoJustificativaProvider } from '../../providers/tipo-justificativa/tipo-justificativa';


@IonicPage()
@Component({
  selector: 'page-tipo-justificativa-list',
  templateUrl: 'tipo-justificativa-list.html',
})
export class TipoJustificativaListPage {

  tipoJustificativa:any[]

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public toast: ToastController,
    public tipoJustificativaProvider: TipoJustificativaProvider,
    public alertCtrl: AlertController
    ){
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TipoJustificativaListPage');
  }
  ionViewWillEnter(){
    this.getAllTipoJustificativas();
  }

  getAllTipoJustificativas(){
    this.tipoJustificativaProvider.getAllTipoJustificativas()
    .then((result: any) => {
      this.tipoJustificativa = result;
      console.log("tipoJustificativa: "+this.tipoJustificativa);
    })
    .catch((error: any) => {
      this.toast.create({ 
        message: 'Erro ao buscar tipos de justificativas. Erro: ' + error, 
        position: 'botton', 
        duration: 2000 }).present();
    });
  }
  openEditTipoJustificativa(id: number) {
    console.log("openEditTipoJustificativa("+id+")");
    this.tipoJustificativaProvider.getTipoJustificativa(id)
      .then((result: any) => {
         this.navCtrl.push('TipoJustificativaEditPage', { tipoJustificativa: result });
      })
      .catch((error: any) => {
        this.toast.create({
          message: 'Erro ao recuperar o Tipo Justificativa. Erro: ' + error, 
          position: 'botton', 
          duration: 2000 }).present();
      });
  }

  deleteTipoJustificativa(justificativas: any) {
    this.tipoJustificativaProvider.removeTipoJustificativa(justificativas.id)
      .then((result: any) => {
        let index = this.tipoJustificativa.indexOf(justificativas);
        this.tipoJustificativa.splice(index, 1);

        this.toast.create({ 
        message: 'Tipo Justificativa excluído com sucesso.', 
        position: 'botton', 
        duration: 2000 }).present();
      })
      .catch((error: any) => {
        this.toast.create({ 
          message: 'Erro ao excluir o Tipo Justificativa. Erro: ' + error, 
          position: 'botton', 
          duration: 2000 }).present();
      });
  }
  
  confirmaExclusao(justificativas: any) { //mudar parametro para o nome que vc precisar
    //let retorno = false;
    let alert = this.alertCtrl.create({
      title: 'Confirma ação?',
      message: 'Esta ação não poderá ser desfeita!',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Ação cancelada');

          }
        },
        {
          text: 'Confirmar',
          handler: () => {
            console.log('Ação confirmada');
            //ESjornadaSE Método é que precisa mudar para deleteUsuario, deleteFeriado, etc...
            this.deleteTipoJustificativa(justificativas);
          }
        }
      ]
    });
    alert.present();
  }


  openCreateTipoJustificativa(){
    this.navCtrl.push('TipoJustificativaEditPage');
  }
}

