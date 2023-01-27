import type { NextPage } from 'next'
import Image from 'next/image'
import { AdminLayout } from '@layout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowDown,
  faArrowUp,
  faDownload,
  faEllipsisVertical,
  faMars,
  faSearch,
  faFileArchive,
  faUsers,
  faVenus,
} from '@fortawesome/free-solid-svg-icons'
import {
  Button, ButtonGroup, Card, Dropdown, ProgressBar,
} from 'react-bootstrap'
import { Bar, Line } from 'react-chartjs-2'
import {
  BarElement,
  CategoryScale,
  Chart,
  Filler,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from 'chart.js'
import {
  faCcAmex,
  faCcApplePay,
  faCcPaypal,
  faCcStripe,
  faCcVisa,
  faFacebookF,
  faLinkedinIn,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons'
import React from 'react'

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Tooltip, Filler)

const random = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min)

const Home: NextPage = () => (
  <AdminLayout>

    <div className="row">
      <div className="col-md-12">
        <Card className="mb-4">
          <Card.Header>
            Certificados
          </Card.Header>
          <Card.Body>

            <div className="table-responsive">
              <table className="table border mb-0">
                <thead className="table-light fw-semibold">
                  <tr className="align-middle">
                    <th className="text-center">
                      <FontAwesomeIcon icon={faFileArchive} fixedWidth />
                    </th>
                    <th>Companhia</th>
                    <th>Issuer</th>
                    <th>Expires</th>
                    <th>Cert-email</th>
                    <th aria-label="Action" />
                  </tr>
                </thead>
                <tbody>
                  <tr className="align-middle">
                    <td className="text-center">
                    </td>
                    <td>
                      <div>RAIZEN S A</div>
                      <div className="small text-black-50">
                        <span>Cnpj</span>
                        {' '}
                        33453598026866
                      </div>
                    </td>
                    <td>
                        <div>
                          <div>SERASA Certificadora Digital v5</div>
                        </div>
                    </td>
                    <td>
                        <div>
                          <div>2023-01-06</div>
                        </div>
                    </td>
                    <td>
                      <div className="small text-black-50">FISCALIZACAOCAR@RAIZEN.COM</div>
                    </td>
                  </tr>
                  <tr className="align-middle">
                    <td className="text-center">
                    </td>
                    <td>
                      <div>KLABIN SA</div>
                      <div className="small text-black-50">
                        <span>Cnpj</span>
                        {' '}
                        89637490013395
                      </div>
                    </td>
                    <td>
                        <div>
                          <div>AC Certisign Multipla G7</div>
                        </div>
                    </td>
                    <td>
                        <div>
                          <div>2023-10-05</div>
                        </div>
                    </td>
                    <td>
                      <div className="small text-black-50">mapgoncalves@klabin.com.br</div>
                    </td>
                  </tr>
                  <tr className="align-middle">
                    <td className="text-center">
                    </td>
                    <td>
                      <div>W L VISANI LTDA</div>
                      <div className="small text-black-50">
                        <span>Cnpj</span>
                        {' '}
                        03824646000181
                      </div>
                    </td>
                    <td>
                        <div>
                          <div>AC SOLUTI Multipla v5</div>
                        </div>
                    </td>
                    <td>
                        <div>
                          <div>2023-17-02</div>
                        </div>
                    </td>
                    <td>
                      <div className="small text-black-50">torresms_contabilidade@hotmail.com</div>
                    </td>
                  </tr>
                  <tr className="align-middle">
                    <td className="text-center">
                    </td>
                    <td>
                      <div>COBB VANTRESS BRASIL LTDA</div>
                      <div className="small text-black-50">
                        <span>Cnpj</span>
                        {' '}
                        00466591000197
                      </div>
                    </td>
                    <td>
                        <div>
                          <div>AC SOLUTI Multipla v5</div>
                        </div>
                    </td>
                    <td>
                        <div>
                          <div>2024-23-08</div>
                        </div>
                    </td>
                    <td>
                      <div className="small text-black-50">leandro.farias@cobbvantress.com</div>
                    </td>
                  </tr>
                  <tr className="align-middle">
                    <td className="text-center">
                    </td>
                    <td>
                      <div>ENGEBASA MECANICA E USINAGEM LTDA</div>
                      <div className="small text-black-50">
                        <span>Cnpj</span>
                        {' '}
                        44952703000195
                      </div>
                    </td>
                    <td>
                        <div>
                          <div>AC Certisign Multipla G7</div>
                        </div>
                    </td>
                    <td>
                        <div>
                          <div>2023-10-10</div>
                        </div>
                    </td>
                    <td>
                      <div className="small text-black-50">MONICA@UNIONCONTABIL.COM.BR</div>
                    </td>
                  </tr>
                  <tr className="align-middle">
                    <td className="text-center">
                    </td>
                    <td>
                      <div>CALOI NORTE SA</div>
                      <div className="small text-black-50">
                        <span>Cnpj</span>
                        {' '}
                        4301024000131
                      </div>
                    </td>
                    <td>
                        <div>
                          <div>AC SINCOR G4</div>
                        </div>
                    </td>
                    <td>
                        <div>
                          <div>2023-26-07</div>
                        </div>
                    </td>
                    <td>
                      <div className="small text-black-50">dfaverani@caloi.com</div>
                    </td>
                  </tr>
                  <tr className="align-middle">
                    <td className="text-center">
                    </td>
                    <td>
                      <div>SPAL INDUSTRIA BRASILEIRA DE BEBIDAS S/A</div>
                      <div className="small text-black-50">
                        <span>Cnpj</span>
                        {' '}
                        61186888003532
                      </div>
                    </td>
                    <td>
                        <div>
                          <div>SERASA Certificadora Digital v5</div>
                        </div>
                    </td>
                    <td>
                        <div>
                          <div>2024-21-02</div>
                        </div>
                    </td>
                    <td>
                      <div className="small text-black-50">AVELINO.PEREIRA@KOF.COM.MX</div>
                    </td>
                  </tr>
                  <tr className="align-middle">
                    <td className="text-center">
                    </td>
                    <td>
                      <div>AUTOMAX COMERCIAL LTDA</div>
                      <div className="small text-black-50">
                        <span>Cnpj</span>
                        {' '}
                        20994976000134
                      </div>
                    </td>
                    <td>
                        <div>
                          <div>AC SOLUTI Multipla v5</div>
                        </div>
                    </td>
                    <td>
                        <div>
                          <div>2024-04-01</div>
                        </div>
                    </td>
                    <td>
                      <div className="small text-black-50">rogerio@automaxfiat.com.br</div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  </AdminLayout>
)

export default Home
