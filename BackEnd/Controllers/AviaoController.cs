using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("[controller]")]
public class AviaoController : ControllerBase
{
    private APIDbContext? _context;
    public AviaoController(APIDbContext context)
    {
        _context = context;
    }
    [HttpGet]
    [Route("listar")]
    public async Task<ActionResult<IEnumerable<Aviao>>> Listar()
    {
        if (_context is null) return NotFound();

        var avioes = await _context.Avioes
            .Include(a => a.CompanhiaAerea)
            .ToListAsync();

        return avioes;
    }
    [HttpGet()]
    [Route("buscar/{id}")]
    public async Task<ActionResult<Aviao>> Buscar([FromRoute] int id)
    {
        if (_context is null) return NotFound();
        var aviaoTemp = await _context.Avioes.FindAsync(id);
        if (aviaoTemp is null) return NotFound();
        var companhiaTemp = await _context.CompanhiasAereas.FindAsync(aviaoTemp.CompanhiaAereaId);
        if (companhiaTemp is null) return NotFound();
        aviaoTemp.CompanhiaAerea = companhiaTemp;
        return aviaoTemp;
    }
    [HttpPost]
    [Route("cadastrar")]
    public async Task<ActionResult<Aviao>> Cadastrar(Aviao aviao)
    {
        var existingCompanhia = await _context.CompanhiasAereas.FindAsync(aviao.CompanhiaAereaId);

        if (existingCompanhia != null)
        {
            aviao.CompanhiaAerea = existingCompanhia;
        }
        else
        {
            return BadRequest("Companhia não encontrada.");
        }
        _context.Avioes.Add(aviao);
        await _context.SaveChangesAsync();

        return Created("", aviao);
    }
    [HttpPost]
    [Route("postMany")]
    public async Task<ActionResult> PostAvioes(List<Aviao> avioes)
    {
        if (_context is null) return NotFound();

        try
        {
            foreach (var aviao in avioes)
            {
                var companhia = await _context.CompanhiasAereas.FindAsync(aviao.CompanhiaAereaId);

                if (companhia == null)
                {
                    return BadRequest($"Companhia com ID {aviao.CompanhiaAereaId} não encontrada.");
                }

                aviao.CompanhiaAerea = companhia;
                _context.Avioes.Add(aviao);
            }

            await _context.SaveChangesAsync();
            return Ok("Aviões adicionados com sucesso");
        }
        catch (Exception ex)
        {
            return BadRequest($"Erro ao adicionar aviões: {ex.Message}");
        }
    }
    [HttpPut()]
    [Route("atualizar")]
    public async Task<ActionResult> Atualizar(Aviao aviao)
    {
        if (_context is null) return NotFound();
        var companhia = await _context.CompanhiasAereas.FindAsync(aviao.CompanhiaAereaId);
        if (companhia is null) return NotFound();
        aviao.CompanhiaAerea = companhia;
        _context.Avioes.Update(aviao);
        await _context.SaveChangesAsync();
        return Ok();
    }
    [HttpPatch()]
    [Route("mudarmodelo/{id}")]
    public async Task<ActionResult> MudarModelo(int id, [FromForm] string modelo)
    {
        if (_context is null) return NotFound();
        if (_context.Avioes is null) return NotFound();
        var aviaoTemp = await _context.Avioes.FindAsync(id);
        if (aviaoTemp is null) return NotFound();
        aviaoTemp.Modelo = modelo;
        await _context.SaveChangesAsync();
        return Ok();
    }
    [HttpDelete()]
    [Route("excluir/{id}")]
    public async Task<ActionResult> Excluir(int id)
    {
        if (_context is null) return NotFound();
        if (_context.Avioes is null) return NotFound();
        var aviaoTemp = await _context.Avioes.FindAsync(id);
        if (aviaoTemp is null) return NotFound();
        _context.Remove(aviaoTemp);
        await _context.SaveChangesAsync();
        return Ok();
    }
}