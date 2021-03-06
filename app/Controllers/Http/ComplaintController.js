'use strict'

const Complaint = use('App/Models/Complaint')
const Drive = use('Drive')
const SpreadSheet = use('SpreadSheet')

/**
 * Resourceful controller for interacting with complaints
 */
class ComplaintController {
  /**
   * Show a list of all complaints.
   * GET fueltypes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index() {
    const complaints = await Complaint.query()
      .with('gasStation')
      .with('user')
      .fetch()
    return complaints
  }

  /**
   * Show a list of all complaints against Gas Station.
   * GET complaints
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async gasStationindex({ params }) {
    const gasStationcomplaints = await Complaint.query()
      .select('message', 'image')
      .where('gas_station_id', params.id)
      .fetch()
    return gasStationcomplaints
  }

  /**
   * Display a single complaint.
   * GET complaints/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params }) {
    const complaint = await Complaint.findOrFail(params.id)
    return complaint
  }

  /**
   * Create/save a new complaint.
   * POST complaints
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ auth, request }) {
    let image = ''
    request.multipart.file('image', {}, async (file) => {
      const imageName = `${new Date().getTime()}.${file.extname}`
      await Drive.put(imageName, file.stream)
      image = `/storage/${imageName}`
    })

    const body = {}
    request.multipart.field((name, value) => body[name] = value)

    await request.multipart.process()

    const { gas_station_id, message } = body
    const complaint = await Complaint.create({
      gas_station_id,
      message,
      image,
      user_id: auth.user.id
    })
    return complaint
  }

  /**
   * Create a csv with all complaints in database.
   * GET complaints/relatory
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async relatory({ request, response }) {
    const ss = new SpreadSheet(response, 'xls')

    const complaints = await Complaint.query().with('gasStation').with('user').fetch()
    const data = []

    data.push([
      'ID',
      'Mensagem da denúncia',
      'Imagem',
      'Nome fantasia do posto',
      'Razão social do posto',
      'CNPJ',
      'Nome do usuário',
      'CPF',
    ])

    complaints.toJSON().forEach((complaint) => {
      data.push([
        complaint.id,
        complaint.message,
        complaint.image,
        complaint.gasStation.fantasy_name,
        complaint.gasStation.business_name,
        complaint.gasStation.cnpj,
        complaint.user.name,
        complaint.user.cpf,
      ])
    })

    ss.addSheet('Denuncias', data)
    ss.download('denuncias')
  }
}

module.exports = ComplaintController
