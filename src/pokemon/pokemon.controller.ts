import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id.pipe';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  // Cambiamos el código de respuesta por defecto (201) a 200.
  // con HttpStatus podemos palabras clave en lugar de números.
  @Post()
  @HttpCode( HttpStatus.CREATED ) 
  create(@Body() createPokemonDto: CreatePokemonDto) {
    return this.pokemonService.create(createPokemonDto);
  }

  // Get All que retorna todos los registros
  // @Get()
  // findAll() {
  //   return this.pokemonService.findAll();
  // }

  // Get All con parametros para la paginacion
  @Get()
  // Agregamos el decorador @Query() para aceptar parametros en la url de la petición
  findAll(@Query() paginationDto: PaginationDto) {
    return this.pokemonService.findAll(paginationDto);
  }

  @Get(':term') // buscamos por el termino de busqueda ( id, name o no )
  findOne(@Param('term') term: string) {
    return this.pokemonService.findOne(term);
  }

  @Patch(':term')
  update(@Param('term') term: string, @Body() updatePokemonDto: UpdatePokemonDto) {
    return this.pokemonService.update(term, updatePokemonDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseMongoIdPipe) id: string) { // Usamos el pipe personalizado para validar el id de MongoDB
    return this.pokemonService.remove(id);
  }
}
