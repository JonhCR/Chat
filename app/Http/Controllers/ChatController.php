<?php

namespace App\Http\Controllers;

use App\Events\ChatEvent;
use App\User;
use Illuminate\Http\Request;

class ChatController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Retorna la vista del chat
     * @return [view] [blade view]
     */
    public function chat()
    {
        return view('chat');
    }

    /**
     * [send Almacena un nuevo mensaje]
     * @param  Request $request [Post Objeto del tipo Chat]
     * @return [Json]
     */
    public function send(Request $request)
    {
        $user = User::find(\Auth::id());
        $this->saveToSession($request);
        event(new ChatEvent($request->message, $user));
    }

    /**
     * [saveToSession Almacena un objeto del tipo chat en la session del usuario]
     * @param  Request $request [Objeto del tipo chat]
     * @return [type]           [description]
     */
    public function saveToSession(Request $request)
    {
        session()->put('chat', $request->chat); //Almacena todo el chat en una sesion
    }

    /**
     * [getOldMessage Retorna el arreglo de objetos tipo Chat en sesion]
     * @return [Json] [Objeto Chat]
     */
    public function getOldMessage()
    {
        return session('chat');
    }
}
