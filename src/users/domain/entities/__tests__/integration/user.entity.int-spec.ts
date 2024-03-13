import { EntityValidationError } from '@/shared/domain/errors/validation-error';
import { UserEntity, UserProps } from '../../user.entity';
import { userDataBuilder } from '@/users/domain/testing/helpers/user-data-builder';

describe('UserEntity integration tests', () => {
  describe('Constructor method', () => {
    it('Should throw an error when creating a user with invalid name', () => {
      let props: UserProps = {
        ...userDataBuilder({}),
        name: null,
      };
      expect(() => new UserEntity(props)).toThrow(EntityValidationError);

      props = {
        ...userDataBuilder({}),
        name: '',
      };
      expect(() => new UserEntity(props)).toThrow(EntityValidationError);

      props = {
        ...userDataBuilder({}),
        name: 10 as any,
      };
      expect(() => new UserEntity(props)).toThrow(EntityValidationError);

      props = {
        ...userDataBuilder({}),
        name: 'a'.repeat(256),
      };
      expect(() => new UserEntity(props)).toThrow(EntityValidationError);
    });

    it('Should throw an error when creating a user with invalid email', () => {
      let props: UserProps = {
        ...userDataBuilder({}),
        email: null,
      };
      expect(() => new UserEntity(props)).toThrow(EntityValidationError);

      props = {
        ...userDataBuilder({}),
        email: '',
      };
      expect(() => new UserEntity(props)).toThrow(EntityValidationError);

      props = {
        ...userDataBuilder({}),
        email: 10 as any,
      };
      expect(() => new UserEntity(props)).toThrow(EntityValidationError);

      props = {
        ...userDataBuilder({}),
        email: 'a'.repeat(256),
      };
      expect(() => new UserEntity(props)).toThrow(EntityValidationError);
    });

    it('Should throw an error when creating a user with invalid password', () => {
      let props: UserProps = {
        ...userDataBuilder({}),
        password: null,
      };
      expect(() => new UserEntity(props)).toThrow(EntityValidationError);

      props = {
        ...userDataBuilder({}),
        password: '',
      };
      expect(() => new UserEntity(props)).toThrow(EntityValidationError);

      props = {
        ...userDataBuilder({}),
        password: 10 as any,
      };
      expect(() => new UserEntity(props)).toThrow(EntityValidationError);

      props = {
        ...userDataBuilder({}),
        password: 'a'.repeat(256),
      };
      expect(() => new UserEntity(props)).toThrow(EntityValidationError);
    });

    it('Should throw an error when creating a user with invalid createdAt field', () => {
      let props: UserProps = {
        ...userDataBuilder({}),
        createdAt: '2023' as any,
      };
      expect(() => new UserEntity(props)).toThrow(EntityValidationError);

      props = {
        ...userDataBuilder({}),
        createdAt: 10 as any,
      };
      expect(() => new UserEntity(props)).toThrow(EntityValidationError);
    });

    it('Should create a valid user', () => {
      expect.assertions(0);
      const props: UserProps = userDataBuilder({});
      new UserEntity(props);
    });
  });

  describe('Update method', () => {
    it('Should update the user with valid data', () => {
      const entity = new UserEntity(userDataBuilder({}));
      expect(() => entity.update(null)).toThrow(EntityValidationError);
      expect(() => entity.update('')).toThrow(EntityValidationError);
      expect(() => entity.update(10 as any)).toThrow(EntityValidationError);
      expect(() => entity.update('a'.repeat(256))).toThrow(
        EntityValidationError,
      );
    });

    it('Should create a valid user', () => {
      expect.assertions(0);
      const props: UserProps = userDataBuilder({});
      const entity = new UserEntity(props);
      entity.update('new name');
    });
  });

  describe('UpdatePassword method', () => {
    it('Should throw an error when updating password with invalid password field', () => {
      const entity = new UserEntity(userDataBuilder({}));
      expect(() => entity.updatePassword(null)).toThrow(EntityValidationError);
      expect(() => entity.updatePassword('')).toThrow(EntityValidationError);
      expect(() => entity.updatePassword(10 as any)).toThrow(
        EntityValidationError,
      );
      expect(() => entity.updatePassword('a'.repeat(101))).toThrow(
        EntityValidationError,
      );
    });

    it('Should update a password', () => {
      expect.assertions(0);
      const props: UserProps = userDataBuilder({});
      const entity = new UserEntity(props);
      entity.updatePassword('new name');
    });
  });
});
