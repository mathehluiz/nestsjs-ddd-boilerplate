import { userDataBuilder } from '@/users/domain/testing/helpers/user-data-builder';
import { UserEntity, UserProps } from '../../user.entity';

describe('UserEntity unit tests', () => {
  let props: UserProps;
  let sut: UserEntity;
  beforeEach(() => {
    props = userDataBuilder({});
    sut = new UserEntity(props);
  });
  it('should create constructor', () => {
    expect(sut.props.name).toEqual(props.name);
    expect(sut.props.email).toEqual(props.email);
    expect(sut.props.password).toEqual(props.password);
  });

  it('Getter of name field', () => {
    expect(sut.props.name).toBeDefined();
    expect(sut.props.name).toEqual(props.name);
    expect(typeof sut.props.name).toBe('string');
  });

  it('Setter of name field', () => {
    sut['name'] = 'other name';
    expect(sut.props.name).toEqual('other name');
  });

  it('Getter of email field', () => {
    expect(sut.props.email).toBeDefined();
    expect(sut.props.email).toEqual(props.email);
    expect(typeof sut.props.email).toBe('string');
  });

  it('Getter of password field', () => {
    expect(sut.props.password).toBeDefined();
    expect(sut.props.password).toEqual(props.password);
    expect(typeof sut.props.password).toBe('string');
  });

  it('Setter of password field', () => {
    sut['password'] = 'other_password';
    expect(sut.props.password).toEqual('other_password');
  });

  it('Getter of createdAt field', () => {
    expect(sut.props.createdAt).toBeDefined();
    expect(sut.props.createdAt).toBeInstanceOf(Date);
  });

  it('Should update a user', () => {
    sut.update('other name');
    expect(sut.props.name).toEqual('other name');
  });

  it('Should update the password field ', () => {
    sut.updatePassword('other_password');
    expect(sut.props.password).toEqual('other_password');
  });
});
