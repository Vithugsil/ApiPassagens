using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("[controller]")]
public class PagamentoController : ControllerBase
{
    private APIDbContext? _context;
    public PagamentoController(APIDbContext context)
    {
        _context = context;
    }
    [HttpGet]
    [Route("listar")]
    public async Task<ActionResult<IEnumerable<Pagamento>>> Listar()
    {
        if (_context is null) return NotFound();
        return await _context.Pagamentos.ToListAsync();
    }
    [HttpGet()]
    [Route("buscar/{id}")]
    public async Task<ActionResult<Pagamento>> Buscar([FromRoute] int id)
    {
        if (_context is null) return NotFound();
        var pagamentoTemp = await _context.Pagamentos.FindAsync(id);
        if (pagamentoTemp is null) return NotFound();
        return pagamentoTemp;
    }
    [HttpPost]
    [Route("cadastrar")]
    public async Task<ActionResult<Pagamento>> Cadastrar(Pagamento pagamento)
    {
        _context.Add(pagamento);
        await _context.SaveChangesAsync();
        return Created("", pagamento);
    }
    [HttpPost]
    [Route("postMany")]
    public async Task<ActionResult> PostPagamentos(List<Pagamento> pagamentos)
    {
        if (_context is null) return NotFound();

        try
        {
            _context.Pagamentos.AddRange(pagamentos);
            await _context.SaveChangesAsync();
            return Ok();
        }
        catch (Exception ex)
        {
            return BadRequest($"Erro ao adicionar funcionarios: {ex.Message}");
        }
    }
    [HttpPut()]
    [Route("alterar")]
    public async Task<ActionResult> Alterar(Pagamento pagamento)
    {
        if (_context is null) return NotFound();
        _context.Pagamentos.Update(pagamento);
        await _context.SaveChangesAsync();
        return Ok();
    }
    [HttpPatch()]
    [Route("mudartipo/{id}")]
    public async Task<ActionResult> MudarTipo(int id, [FromForm] string tipo)
    {
        if (_context is null) return NotFound();
        if (_context.Pagamentos is null) return NotFound();
        var pagamentoTemp = await _context.Pagamentos.FindAsync(id);
        if (pagamentoTemp is null) return NotFound();
        pagamentoTemp.Tipo = tipo;
        await _context.SaveChangesAsync();
        return Ok();
    }
    [HttpDelete()]
    [Route("excluir/{id}")]
    public async Task<ActionResult> Excluir(int id)
    {
        if (_context is null) return NotFound();
        if (_context.Pagamentos is null) return NotFound();
        var pagamentoTemp = await _context.Pagamentos.FindAsync(id);
        if (pagamentoTemp is null) return NotFound();
        _context.Remove(pagamentoTemp);
        await _context.SaveChangesAsync();
        return Ok();
    }
}