import nodemailer from 'nodemailer';
import mailConfig from '../../config/mail';

export default nodemailer.createTransport(mailConfig); // Define cnfiguracao de acesso para o nodemailer