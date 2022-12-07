import { Controller, Get, Render, Query, Param } from '@nestjs/common';
import db from './db';

@Controller()
export class AppController {
  
  @Get()
  @Render('list')
  async listPaintings(@Query('year') year = 1990) {
    const [ rows ] = await db.execute(
      'SELECT title , id FROM paintings WHERE year > ?',
      [ year ]
    );

    return {
      paintings: rows,
    };
  }

  @Get('paintings/new')
  @Render('from')
  newPaintingForm() {
    return {};
  }

  @Get('paintings/:id')
  @Render('show')
  async showPainting(@Param('id') id: number) {
    const [ rows ] = await db.execute(
      'SELECT title, year, on_display FROM paintings WHERE id = ?',
      [ id ]
    );
    return { paintings: rows[0] };
  }
}

