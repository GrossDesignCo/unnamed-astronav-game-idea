// Fill out your copyright notice in the Description page of Project Settings.

#pragma once

#include "CoreMinimal.h"
#include "GameFramework/Actor.h"
#include "OrbitalObject.generated.h"

UCLASS()
class UNNAMEDASTRONAV_API AOrbitalObject : public AActor
{
	GENERATED_BODY()

public:
//	UPROPERTY(VisibleAnywhere, Category = "Components")
//	class USphereComponent *Body;

	UPROPERTY(VisibleAnywhere, Category = "Orbit Props")
	float Name;

	UPROPERTY(VisibleAnywhere, Category = "Orbit Props")
	float Radius;

	UPROPERTY(VisibleAnywhere, Category = "Orbit Props")
	float Mass;

	UPROPERTY(VisibleAnywhere, Category = "Orbit Props")
	float Velocity;

public:
	// Sets default values for this actor's properties
	AOrbitalObject();

protected:
	// Called when the game starts or when spawned
	virtual void BeginPlay() override;

public:
	// Called every frame
	virtual void Tick(float DeltaTime) override;
};
