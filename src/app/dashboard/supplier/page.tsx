import styles from './warehouse.module.scss'
import { Table, TableCell, TableHead, TableRow, TableBody } from "../../components/ui/table/table";
import SupplierForm from '../../components/modal-content/supplier/supplier';
import { FaRegTrashAlt } from 'react-icons/fa';

export default function Supplier() {

  const data = [
    {

      name: 'TGDĐ',
      domain: 'Thiết bị điện tử',
      phone: '012345678',
      address: '123 ABC'


    },
    {

      name: 'TGDĐ',
      domain: 'Thiết bị điện tử',
      phone: '012345678',
      address: '123 ABC'


    },
    {

      name: 'TGDĐ',
      domain: 'Thiết bị điện tử',
      phone: '012345678',
      address: '123 ABC'


    },
    {

      name: 'TGDĐ',
      domain: 'Thiết bị điện tử',
      phone: '012345678',
      address: '123 ABC'


    },
  ]
  return (
    <div className="">
      <h1 className="title">NHÀ CUNG CẤP</h1>
      <div className="" style={{ margin: '2em 0' }}>

        <Table style={{ borderRadius: '0px' }} preHeader={true} pagination={true}
          modalAddContent={<SupplierForm />

          }
          modalTitle={'Thêm nhà cung cấp'} addButtonTitle="Thêm nhà cung cấp"
        >
          <TableHead style={{ background: 'white' }}>
            <TableRow>
              <TableCell>
                Tên nhà cung cấp
              </TableCell>
              <TableCell>
                Lĩnh vực
              </TableCell>
              <TableCell>
                SĐT
              </TableCell>
              <TableCell>
                Địa chỉ
              </TableCell>

              <TableCell>
                Chỉnh sửa
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  {item.name}
                </TableCell>
                <TableCell>
                  {item.domain}
                </TableCell>
                <TableCell>
                  {item.phone}
                </TableCell>
                <TableCell>
                  {item.address}
                </TableCell>

                <TableCell>
                  <div className="" style={{ display: 'flex', gap: '1em' }}>

                    <div className="" style={{ color: '#A30D11', cursor: 'pointer' }}><FaRegTrashAlt /></div>
                  </div>
                </TableCell>
              </TableRow>

            ))}
          </TableBody>
        </Table>
      </div>

    </div>
  )
}
