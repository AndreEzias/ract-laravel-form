<div>
    <h1>Novo cadastro</h1>
    <ul>
        <li>Nome :{{$lead->name}}</li>
        <li>Email :{{$lead->email}}</li>
        <li>Telefone :{{$lead->phone}}</li>
        <li>Cadastrado em {{$lead->created_at->format("d/m/Y H:i:s")}}</li>
    </ul>
</div>
