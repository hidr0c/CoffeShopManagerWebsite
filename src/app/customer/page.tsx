import styles from './warehouse.module.scss'
import { Table, TableCell, TableHead, TableRow, TableBody } from "../components/ui/table/table";
import CustomerForm from '../components/modal-content/customer/customer';
import { FaRegTrashAlt } from 'react-icons/fa';

export default function Supplier () {

  const data = [
    {

      name: 'Nguyễn Văn A',
      sex: 'Nam',
      address: '123 ABC',
      date: '12/10/1999'


    },
    {

      name: 'Nguyễn Văn A',
      sex: 'Nam',
      address: '123 ABC',
      date: '12/10/1999'


    },
    {

      name: 'Nguyễn Văn A',
      sex: 'Nam',
      address: '123 ABC',
      date: '12/10/1999'


    },
    {

      name: 'Nguyễn Văn A',
      sex: 'Nam',
      address: '123 ABC',
      date: '12/10/1999'


    },
  ]
  return (
    <div className="">
      <h1 className="title">KHÁCH HÀNG</h1>
      <div className="" style={{margin: '2em 0'}}>

      <Table style={{borderRadius: '0px'}} preHeader={true} pagination={true}
      modalAddContent={<CustomerForm />

      }
      modalTitle={'Thêm khách hàng'} addButtonTitle="Thêm khách hàng"
      >
        <TableHead style={{background: 'white'}}>
          <TableRow>
            <TableCell>
              Tên khách hàng
            </TableCell>
            <TableCell>
              Ngày tháng năm
            </TableCell>
            <TableCell>
              Giới tính
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
          {data.map((item,index) => (
            <TableRow key={index}>
              <TableCell>
              {item.name}
            </TableCell>
            <TableCell>
              {item.date}
            </TableCell>
            <TableCell>
              {item.sex}
            </TableCell>
            <TableCell>
              {item.address}
            </TableCell>

            <TableCell>
            <div className="" style={{display:'flex',gap:'1em'}}>

              <div className="" style={{color: '#A30D11',cursor:'pointer'}}><FaRegTrashAlt /></div>
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
