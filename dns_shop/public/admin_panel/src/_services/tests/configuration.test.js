describe('Auth Service', function() {

    beforeEach(module('app'));

    var Configuration;
    beforeEach(inject(function(_Configuration_){
        Configuration = _Configuration_;
    }));

    afterEach(function(){
        localStorage.clear();
    })

    it('getStorageData()', function(){
        expect(Configuration.getStorageData('user')).toEqual(JSON.parse(localStorage.getItem('user')));
    });

    it('setStorageData()', function(){
        var defaultUser = {name: 'Anatoly Vasilev'};
        Configuration.setStorageData('user', defaultUser);
        expect(Configuration.getStorageData('user')).toEqual(defaultUser);
    });

    it('removeStorageData()', function(){
        var defaultUser = {name: 'Anatoly Vasilev'};
        Configuration.setStorageData('user', defaultUser);
        Configuration.removeStorageData('user');
        expect(Configuration.getStorageData('user')).toBe(null);
    });

    it('getItem() private mode', function(){
        try{
            spyOn(localStorage, 'getItem').and.throwError("localStorage is unabled in private mode");
            expect(Configuration.getStorageData('user')).toThrow();
        }catch(e){}
    });

    it('setItem() private mode', function(){
        try{
            spyOn(localStorage, 'setItem').and.throwError("localStorage is unabled in private mode");
            expect(Configuration.setStorageData('user', 'someuser')).toThrow("localStorage is unabled in private mode");
        }catch(e){}
    });

    it('removeItem() private mode', function(){
        try{
            spyOn(localStorage, 'removeItem').and.throwError("localStorage is unabled in private mode");
            expect(Configuration.removeStorageData('user')).toThrow();
        }catch(e){}
    });



});