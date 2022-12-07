import { Controller, Get, Render, Query } from '@nestjs/common';
import db from './db';

@Controller()
export class AppController {
  
  @Get()
  @Render('list')
  async listPaintings(@Query('year') year = 1990) {
    const [ rows ] = await db.execute(
      'SELECT title FROM paintings WHERE year > ?',
      [ year ]
    );

    return {
      paintings: rows,
    };
  }
}
