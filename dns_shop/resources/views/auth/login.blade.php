@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-7 col-md-offset-3">
            <div class="login-panel">
                <div class="login-heading">Войти в личный кабинет</div>
                <div class="login-body">
                    @if (session('status'))
                        <div class="alert alert-success">
                            {{ session('status') }}
                        </div>
                    @endif
                    @if (session('warning'))
                        <div class="alert alert-warning">
                            {{ session('warning') }}
                        </div>
                    @endif

                    <form class="form-horizontal" role="form" method="POST" action="{{ url('/login') }}">
                        {{ csrf_field() }}

                        <div class="form-group{{ $errors->has('login') ? ' has-error' : '' }}">
                            <label for="login" class="control-label">Логин</label>
                            <div>
                                <input id="login" type="text" class="form-control" name="login" value="{{ old('login') }}">

                                @if ($errors->has('login'))
                                    <span class="help-block">
                                        <strong>{{ $errors->first('login') }}</strong>
                                    </span>
                                @endif
                            </div>
                        </div>

                        <div class="form-group{{ $errors->has('password') ? ' has-error' : '' }}">
                            <label for="password" class="control-label">Пароль</label>
                            <div>
                                <input id="password" type="password" class="form-control" name="password">
                                @if ($errors->has('password'))
                                    <span class="help-block">
                                        <strong>{{ $errors->first('password') }}</strong>
                                    </span>
                                @endif
                            </div>
                        </div>

                        <div class="form-group">
                            <div>
                                <div class="checkbox">
                                    <label>
                                        <input type="checkbox" name="remember"> Запомнить меня
                                    </label>
                                </div>
                            </div>
                        </div>

                        <a class="btn btn-link" href="{{ url('/password/reset') }}">Забыл пароль?</a>

                        <div class="form-group">
                            <div>
                                <button type="submit" class="btn btn-primary">
                                    <i class="fa fa-btn fa-sign-in"></i> Войти
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
